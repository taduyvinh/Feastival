class Ability
  include CanCan::Ability

  def initialize user
      binding.pry

    id = user.id
    user ||= User.new
    can :read, [Group, User, Restaurant]
    return if user.new_record?
    can :manage, :all if user.has_role? :admin
    can :update, User, id: id
    can :manage, Restaurant do |restaurant|
      user.has_role? :manager, restaurant
    end
    can :create, Group
    can :update, Group, creator_id: id
    can :create, GroupUser
    can :destroy, GroupUser, group_id: id
    can [:update, :destroy], GroupUser do |group_user|
      user.has_role? :creator, group_user.group
    end
    can :create, Report
  end
end
