module Api
  class BaseController < ActionController::API
    include CanCan::ControllerAdditions
    include Authenticable
    acts_as_token_authentication_handler_for User, fallback: :none

    rescue_from CanCan::AccessDenied do
      render json: {
        messages: I18n.t("api.not_authorized")
      }, status: :unauthorized
    end

    private

    alias authenticate_user_from_token authenticate_with_token!

    def find_variable_name
      return if params_controller.blank?
      params_controller.split("/").last.singularize
    end

    def ensure_parameters_exist
      find_variable_name

      return if params[find_variable_name].present?
      render json: {
        messages: I18n.t("api.missing_params")
      }, status: :unprocessable_entity
    end

    def params_controller
      params[:controller]
    end

    def find_object
      instance_name = find_variable_name
      instance_variable_set "@#{instance_name}",
        instance_name.classify.constantize.find_by(id: params[:id])

      return if instance_variable_get "@#{instance_name}"
      render json: {messages: I18n.t("object_not_found")}, status: :not_found
    end
  end
end
