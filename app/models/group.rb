class Group < ApplicationRecord
  belongs_to :creator, class_name: User.name

  has_many :group_users, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :notifications, as: :source, dependent: :destroy
  has_many :reports, as: :reported, dependent: :destroy
  has_many :users, through: :group_users
end
