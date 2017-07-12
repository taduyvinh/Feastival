class Report < ApplicationRecord
  belongs_to :reported, polymorphic: true
  belongs_to :reporter, class_name: User.name
end
