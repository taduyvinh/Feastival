module Api
  class RestaurantsController < BaseController
    attr_reader :restaurant

    before_action :find_object, only: [:show, :update]
    before_action :correct_user, only: [:update]

    def index
      render json: {
        restaurants: Restaurant.all
      }, status: :ok
    end

    def create
      @restaurant = Restaurant.new restaurant_params

      restaurant.save ? response_create_success : response_create_fail
    end

    def show
      response_show_succcess
    end

    def update
      if restaurant.update_attributes restaurant_params
        return response_update_success
      end
      response_update_fail
    end

    private

    def correct_user
      return if restaurant.manager_id.eql? current_user.id
      render json: {
        message: I18n.t("api.restaurants.dont_have_permission")
      }, status: :forbidden
    end

    def response_create_success
      render json: {
        message: I18n.t("api.restaurants.create_success"),
        restaurant: restaurant
      }, status: :ok
    end

    def response_create_fail
      render json: {
        message: I18n.t("api.restaurants.create_fail")
      }, status: :unprocessable_entity
    end

    def response_show_succcess
      render json: {
        message: I18n.t("api.restaurants.show_success"),
        restaurant_info: {
          restaurant: restaurant
        }
      }, status: :ok
    end

    def response_update_success
      render json: {
        message: I18n.t("api.restaurants.update_success"),
        restaurant: restaurant
      }, status: :ok
    end

    def response_update_fail
      render json: {
        message: I18n.t("api.restaurants.update_fail")
      }, status: :unprocessable_entity
    end

    def restaurant_params
      params.require(:restaurant).permit Restaurant::UPDATE_PARAMS
    end
  end
end
