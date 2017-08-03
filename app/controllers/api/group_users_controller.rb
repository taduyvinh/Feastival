module Api
  class GroupUsersController < BaseController
    before_action :find_object, only: [:show, :update, :destroy]
    before_action :find_group, only: [:index, :update, :destroy]

    authorize_resource

    def index
      @group_users = group.group_users.pending
      response_index
    end

    def create
      @group_user = current_user.group_users.build new_group_user_params
      group_user.save ? response_create_success : response_create_fail
    end

    def update
      if group_user.update_attributes update_group_user_params
        response_update_success
      else
        response_update_fail
      end
    end

    def destroy
      group_user.destroy
      response_destroy
    end

    private

    attr_reader :group_user, :group_users, :group

    def response_index
      render json: {
        message: I18n.t("api.group_user.index"),
        group_users: group.group_users.pending.as_json(include:
          {
            user: {include: :profile}
          }
        )
      }, status: :ok
    end

    def response_destroy
      render json: {
        message: I18n.t("api.group_user.destroy"),
        group_users: group.group_users.pending.as_json(include:
          {
            user: {include: :profile}
          }
        )
      }, status: :ok
    end

    def response_create_success
      render json: {
        message: I18n.t("api.group_user.create_success"),
        group_user: group_user
      }, status: :ok
    end

    def response_create_fail
      render json: {
        message: I18n.t("api.group_user.create_fail")
      }, status: :unprocessable_entity
    end

    def response_update_success
      render json: {
        message: I18n.t("api.group_user.update_success"),
        group_user: group_user,
        group_users: group.group_users.pending.as_json(include:
          {
            user: {include: :profile}
          }
        )
      }, status: :ok
    end

    def response_update_fail
      render json: {
        message: I18n.t("api.group_user.update_fail")
      }, status: :unprocessable_entity
    end

    def update_group_user_params
      params.require(:group_user).permit :status
    end

    def new_group_user_params
      params.require(:group_user).permit :group_id, :user_id, :status
    end

    def find_group
      @group = Group.find_by id: params[:group_id]
      return if group
      render json: {
        message: I18n.t("api.group_user.group_not_found")
      }, status: :not_found
    end

    def updated_group_users
      @group_users = group.group_users.pending
    end
  end
end
