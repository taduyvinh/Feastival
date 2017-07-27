module Api
  class GroupsController < BaseController
    before_action :find_object, only: [:show, :update]
    authorize_resource

    def index
      @groups = Group.all
      @restaurants = Restaurant.joins(:groups).distinct
      response_index_data
    end

    def new
      @categories = Category.all
      @restaurants = Restaurant.all
      response_new_data
    end

    def create
      @group = current_user.groups.create group_params
      if group.save
        group.assign_creator current_user
        response_create_data
      else
        response_create_fail
      end
    end

    def show
      response_show_data
    end

    def update
      return response_update_data if group.update_attributes group_params
      response_update_fail
    end

    private

    attr_reader :group, :groups, :restaurants, :categories, :role

    def response_new_data
      render json: {
        restaurant: restaurants,
        categories: categories
      }, status: :ok
    end

    def response_index_data
      render json: {
        message: I18n.t(".group.index_success"),
        groups: groups,
        restaurants: restaurants
      }, status: :ok
    end

    def response_show_data
      render json: {
        message: I18n.t(".group.show_success"),
        group: group
      }, status: :ok
    end

    def response_create_data
      render json: {
        message: I18n.t(".groups.create_success"),
        group: group
      }, status: :ok
    end

    def response_create_fail
      render json: {
        message: I18n.t(".group.create_fail")
      }, status: :unprocessable_entity
    end

    def response_update_data
      render json: {
        message: I18n.t(".groups.update_success"),
        group: group
      }, status: :ok
    end

    def response_update_fail
      render json: {
        message: I18n.t("groups.update_fail")
      }, status: :unprocessable_entity
    end

    def group_params
      params.require(:group).permit Group::GROUP_PARAMS
    end
  end
end
