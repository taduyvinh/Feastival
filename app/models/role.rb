class Role < ApplicationRecord
  belongs_to :resource, polymorphic: true, optional: true

  has_many :users, through: :users_roles
  has_many :users_roles, dependent: :destroy

  validates :resource_type, inclusion: {in: Rolify.resource_types},
    allow_nil: true

  scopify
end
