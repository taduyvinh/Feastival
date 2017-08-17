class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  UPDATE_PARAMS = [profile_attributes: [:name, :address,
    :gender, :phonenumber, :birthday, :job, :avatar, :description]].freeze
  REGISTRATION_PARAMS = [:email, :password, :password_confirmation,
    :provider, :uid, users_roles_attributes: [:user_id, :role_id]].freeze
  acts_as_token_authenticatable

  rolify

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

  has_many :created_groups, class_name: Group.name, foreign_key: :creator_id,
    dependent: :destroy
  has_many :created_reports, class_name: Report.name, foreign_key: :reporter_id,
    dependent: :destroy
  has_many :group_users, dependent: :destroy
  has_many :groups, through: :group_users
  has_many :messages, dependent: :destroy
  has_many :users_roles, dependent: :destroy
  has_many :roles, through: :users_roles

  has_one :profile, dependent: :destroy
  has_one :restaurant, foreign_key: :manager_id, dependent: :destroy

  accepts_nested_attributes_for :profile, update_only: true

  validates :email, presence: true, length: {maximum: 50},
    format: {with: VALID_EMAIL_REGEX}, uniqueness: {case_sensitive: false}

  before_create :build_profile, :assign_default_role

  def assign_default_role
    add_role :normal
  end

  def generate_new_authentication_token
    token = User.generate_unique_secure_token
    update_attributes authentication_token: token
  end

  def current_user? user
    self == user
  end

  def pending_groups
    groups.includes(:group_users).distinct
      .where group_users: {status: :pending}
  end

  def joined_groups
    groups - pending_groups - created_groups
  end
end
