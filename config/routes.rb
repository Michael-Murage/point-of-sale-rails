Rails.application.routes.draw do
	namespace :api do
  	resources :items, only: [:index]
  	resources :sales, only: [:create, :destroy, :index, :show]
		patch '/quantity', to: 'items#update_quantity'
  	# resources :customers
  	# resources :categories
  	resources :suppliers, only: [:index]
  	resources :users, only: [:show]
		post '/signup', to: 'users#create'
		get '/me', to: 'users#show'
		post '/login', to: 'sessions#create'
		delete '/logout', to: 'sessions#destroy'
	end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
