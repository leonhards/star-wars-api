import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import InfiniteScroll from './InfiniteScroll';

const DoInfiniteScroll = (props) => {
  const [lastPage, setLastPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const [listItems, setListItems] = useState('');
  const [isFetching, setIsFetching] = InfiniteScroll(fetchMoreListItems);

  function fetchMoreListItems() {
    let pagination = localStorage.getItem(`${props.currentTab}_page_${pageNumber}`);
    if(!pagination) {
      if(!lastPage) cachedPagination();
    } else {
      let fetchLocal = localStorage.getItem(`${props.currentTab}_page_${pageNumber}`);
      setTimeout(() => {
        setListItems(prevState => ([...prevState, ...JSON.parse(fetchLocal)]));
        setIsFetching(false);
      }, 500);
    }

    setPageNumber(pageNumber + 1);
  }

  function cachedPagination() {
    fetch(`https://swapi.co/api/${props.currentTab}/?page=${pageNumber}`)
      .then(res => res.json())
      .then((data) => {
        if(!data.next) setLastPage(true);

        if(data.results) {
          localStorage.setItem(props.currentTab+'_page_'+pageNumber, JSON.stringify(data.results));
          setListItems(prevState => ([...prevState, ...data.results]));
          setIsFetching(false);
        }
      })
      .catch(console.log)
  }
  
  let lastKeyList = localStorage.getItem(`${props.currentTab}`);
  if(lastKeyList) lastKeyList = JSON.parse(lastKeyList).length + 1;

  return (
    <React.Fragment>
      {listItems ? (
        listItems.map((listItem, i) => {
          return (
            <Card
              key={lastKeyList + i}
              data={listItem}
              currentTab={props.currentTab}
              initCap={props.initCap} />
          )
        })
      ) : (
        ''
      )}
      
      {isFetching && !lastPage && (
        <div className="loader">
          <i className="fa fa-spinner fa-pulse fa-fw"></i>&nbsp;Loading...
        </div>
      )}
    </React.Fragment>
  )
}

class Cards extends Component {
  static propTypes = {
    initCap: PropTypes.func.isRequired,
    currentTab: PropTypes.string.isRequired,
    data: PropTypes.instanceOf(Array).isRequired
  }

  render() {
    const {
      props: {
        initCap,
        currentTab,
        data
      }
    } = this;

    return (
      <React.Fragment>
        {data ? (
          data.map((obj, i) => {
            return (
              <Card
                key={i}
                data={obj}
                currentTab={currentTab}
                initCap={initCap} />
            )
          })

        ) : (
          <li className="card-item">
            <div>No data found!</div>
          </li>
        )}

        <DoInfiniteScroll
          data={data}
          currentTab={currentTab}
          initCap={initCap}
        />

      </React.Fragment>
    )
  }
}

export default Cards;