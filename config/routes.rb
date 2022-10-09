Rails.application.routes.draw do
	namespace :api do
  	resources :items
  	resources :sales
  	resources :customers
  	resources :categories
  	resources :suppliers
  	resources :users, only: []
		post '/signup', to: 'users#create'
		get '/me', to: 'users#show'
		post '/login', to: 'sessions#create'
		delete '/logout', to: 'sessions#destroy'
	end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
