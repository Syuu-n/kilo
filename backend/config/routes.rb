Rails.application.routes.draw do
  devise_for :user, only: []
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :v1, defaults: { format: :json } do
    resource :login, only: [:create], controller: :sessions
    get 'me' => 'sessions#me'
    get 'my_lessons' => 'sessions#my_lessons'
    get 'roles' => 'sessions#roles'

    resources :users, except: [:new, :edit] do
      member do
        get 'lessons' => 'users#my_lessons'
      end
    end
    resource :trials, only: [:create, :update]
    resource :passwords, only: [:create, :update]

    resources :plans, except: [:new, :edit]

    resources :lessons, except: [:new, :edit] do
      member do
        post 'join' => 'lessons#user_join'
        delete 'leave' => 'lessons#user_leave'
      end
    end

    resources :lesson_classes, except: [:new, :edit]
  end
end
