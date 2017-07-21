module Api
  class RestaurantsController < BaseController
    attr_reader :restaurant

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

    def response_create_success
      render json: {
        message: t("api.restaurants.create_success"),
        restaurant: restaurant
      }, status: :ok
    end

    def response_create_fail
      render json: {
        message: t("api.restaurants.create_fail")
      }, status: :unprocessable_entity
    end

    def response_show_succcess
      render json: {
        message: t("api.restaurants.show_success"),
        restaurant_info: {
          restaurant: restaurant
        }
      }, status: :ok
    end

    def response_update_success
      render json: {
        message: t("api.restaurants.update_success"),
        user: user, profile: user.profile
      }, status: :ok
    end

    def response_update_fail
      render json: {
        message: t("api.users.update_fail")
      }, status: :unprocessable_entity
    end

    def restaurant_params
      params.require(:restaurant).permit Restaurant::UPDATE_PARAMS
    end
  end
end
