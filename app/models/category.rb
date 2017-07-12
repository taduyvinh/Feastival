class Category < ApplicationRecord
  has_many :restaurants, dependent: :destroy
  has_many :groups, dependent: :destroy
end
