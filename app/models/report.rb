class Report < ApplicationRecord
  belongs_to :reporter, class_name: User.name
  belongs_to :reported, polymorphic: true

  has_many :notifications, as: :source, dependent: :destroy
end
