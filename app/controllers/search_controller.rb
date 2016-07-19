class SearchController < ApplicationController

  def home
  end

  def search
    if params.any?
      songs_info = CatalogSearchService.new(params).call
    else
      songs_info = nil
    end
    
    render json: songs_info.to_json
  end

end