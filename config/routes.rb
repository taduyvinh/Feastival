Rails.application.routes.draw do
  get "pages/:page", to: "pages#show", as: "page"
  root "pages#show", page: "home"

  devise_for :users

  devise_scope :user do
    get "/signup", to: "devise/registrations#new"
    post "/signup", to: "devise/registrations#create"
    get "/login", to: "devise/sessions#new"
    post "/login", to: "devise/sessions#create"
    delete "/logout", to: "devise/sessions#destroy"
  end
end
