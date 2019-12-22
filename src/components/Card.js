import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  static propTypes = {
    initCap: PropTypes.func.isRequired,
    currentTab: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
  }

  render() {
    const {
      props: {
        initCap,
        currentTab,
        data
      }
    } = this;

    let fields = {
      "films": ['title', 'opening_crawl', 'director', 'producer', 'release_date'],
      "people": ['name', 'height', 'mass', 'birth_year', 'gender'],
      "planets": ['name', 'diameter', 'climate', 'terrain', 'population'],
      "species": ['name', 'classification', 'skin_colors', 'average_lifespan', 'language'],
      "starships": ['name', 'model', 'manufacturer', 'passengers', 'consumables'],
      "vehicles": ['name', 'model', 'manufacturer', 'crew', 'passengers']
    };

    return (
      <React.Fragment>
        <li className="card-item">
          <div className="card-content">
            <h2>{data[fields[currentTab][0]]}</h2>
            {(fields[currentTab][1] === 'opening_crawl') ? <p>{data[fields[currentTab][1]]}</p> : null}
            <p>
              {(fields[currentTab][1] !== 'opening_crawl') &&
                <span>{initCap(fields[currentTab][1])}: <em>{data[fields[currentTab][1]]}</em><br /></span>
              }
              <span>{initCap(fields[currentTab][2])}: <em>{data[fields[currentTab][2]]}</em><br /></span>
              <span>{initCap(fields[currentTab][3])}: <em>{data[fields[currentTab][3]]}</em><br /></span>
              <span>{initCap(fields[currentTab][4])}: <em>{data[fields[currentTab][4]]}</em></span>
            </p>
          </div>
        </li>
      </React.Fragment>
    )
  }
}

export default Card;