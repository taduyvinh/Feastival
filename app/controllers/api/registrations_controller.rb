module Api
  class RegistrationsController < Devise::RegistrationsController
    protect_from_forgery with: :null_session

    def create
      @user = User.new user_params
      user.save ? response_create_success : response_create_fail
    end

    private

    attr_reader :user

    def response_create_success
      render json: {
        message: I18n.t("api.users.sign_up_success"),
        user: user
      }, status: :ok
    end

    def response_create_fail
      render json: {
        message: I18n.t("api.users.sign_up_fail")
      }, status: :unprocessable_entity
    end

    def user_params
      params.require(:user).permit User::REGISTRATION_PARAMS
    end
  end
end
