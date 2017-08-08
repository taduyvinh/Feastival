module Api
  class VouchersController < BaseController
    attr_reader :voucher

    before_action :find_object, only: [:show, :update]
    before_action :load_restaurant
    before_action :correct_manager, only: [:update, :destroy]

    def index
      response_index
    end

    def create
      @voucher = restaurant.vouchers.build voucher_params
      voucher.save ? response_create_success : response_create_fail
    end

    def show
      response_show_succcess
    end

    def update
      return response_update_success if voucher.update_attributes voucher_params
      response_update_fail
    end

    def destroy
      voucher.destroy
      render json: {
        message: I18n.t("api.vouchers.destroy")
      }, status: :ok
    end

    private

    attr_reader :voucher, :restaurant

    def load_restaurant
      @restaurant = Restaurant.find_by id: params[:restaurant_id]

      return if restaurant
      render json: {
        message: I18n.t("api.vouchers.no_restaurant")
      }, status: :not_found
    end

    def correct_manager
      return if restaurant.manager.eql? current_user
      render json: {
        message: I18n.t("api.vouchers.dont_have_permission")
      }, status: :forbidden
    end

    def response_create_success
      render json: {
        message: I18n.t("api.vouchers.create_success"),
        voucher: voucher
      }, status: :ok
    end

    def response_create_fail
      render json: {
        message: voucher.errors.full_messages.to_sentence
      }, status: :unprocessable_entity
    end

    def response_index
      render json: {
        voucher: restaurant.vouchers
      }, status: :ok
    end

    def response_show_succcess
      render json: {
        voucher: restaurants.vouchers.find_by(id: params[:id])
      }, status: :ok
    end

    def response_update_success
      render json: {
        message: I18n.t("api.vouchers.update_success"),
        voucher: voucher
      }, status: :ok
    end

    def response_update_fail
      render json: {
        message: I18n.t("api.vouchers.update_fail")
      }, status: :unprocessable_entity
    end

    def voucher_params
      params.require(:voucher).permit Voucher::ATTRIBUTE_PARAMS
    end
  end
end
