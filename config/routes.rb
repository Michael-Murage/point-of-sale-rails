Rails.application.routes.draw do
  resources :items
  resources :sales
  resources :customers
  resources :categories
  resources :suppliers
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
