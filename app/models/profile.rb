class Profile < ApplicationRecord
  belongs_to :user

  has_many :reports, as: :reported, dependent: :destroy
end
