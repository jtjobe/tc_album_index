# == Schema Information
#
# Table name: songs
#
#  id         :integer          not null, primary key
#  song_title :string
#  album_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :song do
    sequence(:song_title) { |n| "Song #{n}" }
    album
  end
end
