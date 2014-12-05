Date::DATE_FORMATS[:month_and_year] = '%B %Y'
Date::DATE_FORMATS[:short_date_and_time] = lambda { |time|
      time.strftime("%b #{ActiveSupport::Inflector.ordinalize(time.day)}, %Y at %H:%M") }
Date::DATE_FORMATS[:short_date] = lambda { |date|
      date.strftime("%b #{ActiveSupport::Inflector.ordinalize(date.day)}, %Y") }
