class Ability
  include CanCan::Ability

  def initialize user
    user ||= User.new
    can :read, [Group, Restaurant]

    return if user.new_record?
    id = user.id
    can :manage, :all if user.has_role? :admin
    can :update, User, id: id
    can :manage, Restaurant do |restaurant|
      user.has_role? :manager, restaurant
    end
    can :create, Group
    can :update, Group, creator_id: id
    can :create, GroupUser
    can :destroy, GroupUser, user_id: id
    can [:update, :destroy, :index], GroupUser do |group_user|
      user.has_role? :creator, group_user.group
    end
    can :create, Report
  end
end
