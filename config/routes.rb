Rails.application.routes.draw do
  devise_for :users
  root "react_app#home"
  get "*path", to: "react_app#home"
end
