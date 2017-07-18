module Api
  class UsersController < BaseController
    before_action :find_object
    before_action :correct_user, only: :update

    def show
      response_show_succcess
    end

    def update
      return response_update_success if user.update_attributes user_params
      response_update_fail
    end

    private

    attr_reader :user

    def response_show_succcess
      render json: {
        message: I18n.t("api.users.show_success"),
        user_info: {
          id: user.id,
          email: user.email,
          profile: user.profile
        }
      }, status: :ok
    end

    def response_update_success
      render json: {
        message: I18n.t("api.users.update_success"),
        user: user, profile: user.profile
      }, status: :ok
    end

    def response_update_fail
      render json: {
        message: I18n.t("api.users.update_fail")
      }, status: :unprocessable_entity
    end

    def correct_user
      return if user.current_user? current_user
      render json: {
        message: I18n.t("api.users.not_authorized")
      }, status: :unauthorized
    end

    def user_params
      params.require(:user).permit User::UPDATE_PARAMS
    end
  end
end
