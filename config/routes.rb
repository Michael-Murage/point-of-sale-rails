Rails.application.routes.draw do
	namespace :api do
  	resources :items, only: [:index]
  	resources :sales, only: [:create, :destroy, :index, :show]
		patch '/quantity', to: 'items#update_quantity'
  	# resources :customers
  	resources :categories, only: [:index, :show, :update, :destroy, :create]
  	resources :suppliers, only: [:index, :show, :update, :destroy, :create]
  	resources :users, only: [:show, :index, :update, :destroy, :create]
		get '/user/:id', to: 'users#showUser'
		post '/signup', to: 'users#create'
		get '/me', to: 'users#show'
		post '/login', to: 'sessions#create'
		delete '/logout', to: 'sessions#destroy'
	end

	get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
