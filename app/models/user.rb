class User < ApplicationRecord
  rolify
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

  has_many :created_groups, class_name: Group.name, foreign_key: :creator_id,
    dependent: :destroy
  has_many :created_reports, class_name: Report.name, foreign_key: :reporter_id,
    dependent: :destroy
  has_many :groups, through: :group_users
  has_many :group_users, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :users_roles, dependent: :destroy
  has_many :roles, through: :users_roles

  has_one :profile, dependent: :destroy
  has_one :restaurant, foreign_key: :manager_id, dependent: :destroy
end
