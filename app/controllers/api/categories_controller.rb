module Api
  class CategoriesController < BaseController
    def index
      @categories = Category.all
      response_index
    end

    private

    attr_reader :categories

    def response_index
      render json: {
        status: 200,
        error: false,
        message: I18n.t("api.categories.index"),
        categories: categories
      }, status: :ok
    end
  end
end
