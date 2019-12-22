import React, { Component } from 'react';
import Tabs from './components/Tabs';
import Cards from './components/Cards';

import './assets/css/font-awesome.min.css';
import './assets/css/cards.css';
import './App.css';

class App extends Component {
  state = {
    currentTab: 'films',
    data: []
  }

  initCap = (str) => {
    var label = str.toLowerCase().replace(/_/g, ' ').replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });

    return label;
  }

  componentDidMount() {
    let firstLoad = localStorage.getItem('films');
    if(!firstLoad) {
      fetch('https://swapi.co/api/films')
      .then(res => res.json())
      .then((data) => {
        localStorage.setItem('films', JSON.stringify(data.results));
        let firstLoad = localStorage.getItem('films');
        this.setState({ currentTab: 'films', nextPage: '', data: JSON.parse(firstLoad) });
      })
      .catch(console.log)
    } else {
      this.setState({ data: JSON.parse(firstLoad) });
    }
  }

  onTabLabel = (label) => {
    let lastKnownStorage = localStorage.getItem(label);
    if (lastKnownStorage) {
      this.setState({ data: JSON.parse(lastKnownStorage), currentTab: label });
    } else {
      this.cachedLocalStorage(label);
    }
  }

  cachedLocalStorage = (label) => {
    fetch(`https://swapi.co/api/${label}`)
      .then(res => res.json())
      .then((data) => {
        localStorage.setItem(label, JSON.stringify(data.results));
        let loadStorage = localStorage.getItem(label);
        this.setState({ currentTab: label, data: JSON.parse(loadStorage) });
      })
      .catch(console.log)
  }

  searchText = (text) => {
    if(text) {
      let searchData = [];
      let currentTab = this.state.currentTab;
      let field = (currentTab === 'films') ? 'title' : 'name';
      let loadStorage = localStorage.getItem(currentTab);
      let searchResult = JSON.parse(loadStorage).find( obj => obj[field].toLowerCase() === text.toLowerCase() );
      if(typeof searchResult !== 'undefined') {
        searchData.push(searchResult);
        this.setState({ data: searchData });
      } else {
        this.setState({ data: '' });
      }
    } else {
      let loadStorage = localStorage.getItem(this.state.currentTab);
      this.setState({ data: JSON.parse(loadStorage) });
    }
  }

  render() {
    const {
      initCap,
      onTabLabel,
      searchText,
      state: {
        currentTab,
        data,
      }
    } = this;

    return (
      <div className="App">
        <h1>STAR WARS</h1>
        <Tabs onTabLabel={onTabLabel} initCap={initCap} searchText={searchText}>
          <div label="films" icon="fa-video-camera">
            <ul className="cards">
              <Cards
                data={data}
                currentTab={currentTab}
                initCap={initCap} />
            </ul>
          </div>
          <div label="people" icon="fa-users">
            <ul className="cards">
              <Cards
                data={data}
                currentTab={currentTab}
                initCap={initCap} />
            </ul>
          </div>
          <div label="planets" icon="fa-globe">
            <ul className="cards">
              <Cards
                data={data}
                currentTab={currentTab}
                initCap={initCap} />
            </ul>
          </div>
          <div label="species" icon="fa-reddit-alien">
            <ul className="cards">
              <Cards
                data={data}
                currentTab={currentTab}
                initCap={initCap} />
            </ul>
          </div>
          <div label="starships" icon="fa-space-shuttle">
            <ul className="cards">
              <Cards
                data={data}
                currentTab={currentTab}
                initCap={initCap} />
            </ul>
          </div>
          <div label="vehicles" icon="fa-truck">
            <ul className="cards">
              <Cards
                data={data}
                currentTab={currentTab}
                initCap={initCap} />
            </ul>
          </div>
        </Tabs>
        <div className="footer">©2019 Leonhard Sinaga</div>
      </div>
    );
  }
}

export default App;