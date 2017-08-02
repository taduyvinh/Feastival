module Api
  class GroupsController < BaseController
    skip_before_action :authenticate_user_from_token
    before_action :find_object, only: [:show, :update]
    authorize_resource

    def index
      load_groups
      load_restaurants
      response_index_data
    end

    def new
      @categories = Category.all
      @restaurants = Restaurant.all
      response_new_data
    end

    def create
      @group = current_user.created_groups.create group_params
      if group.save
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

    attr_reader :group, :groups, :restaurants, :categories

    def load_groups
      @groups = Group.not_restaurant.displayed params[:lat], params[:lng],
        params[:distance]
    end

    def load_restaurants
      @restaurants = Restaurant.joins(:groups).distinct.displayed params[:lat],
        params[:lng], params[:distance]
    end

    def response_new_data
      render json: {
        restaurant: restaurants,
        categories: categories
      }, status: :ok
    end

    def response_index_data
      render json: {
        restaurants: restaurants.as_json(include: :groups),
        groups: groups
      }
    end

    def response_show_data
      group_user = group.group_users.find_by user: current_user
      render json: {
        message: I18n.t(".group.show_success"),
        group: group,
        users: group.joined_users.as_json(include: :profile),
        group_user: group_user,
        creator: group.creator.as_json(include: :profile)
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
