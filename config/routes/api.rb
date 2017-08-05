require "api_constraints"

namespace :api, defaults: {format: "json"} do
  devise_scope :user do
    post "sign_up", to: "registrations#create"
    post "sign_in", to: "sessions#create"
    delete "sign_out", to: "sessions#destroy"
    resources :users, only: [:show, :update]
    resources :restaurants, only: [:show, :index, :update] do
      resources :vouchers, except: [:new, :edit]
    end
    resources :groups, except: [:edit] do
      resources :group_users, except: [:show, :edit, :new]
    end
  end

  scope module: :v1,
    constraints: ApiConstraints.new(version: 1, default: true) do
  end
end
