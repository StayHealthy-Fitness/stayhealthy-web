import { AutoComplete, Input, Icon } from "antd";
import React, { useState } from "react";
import { css } from "@emotion/core";

const ActivitySearchInput = (props) => {
  const [locationSearchValue, setLocationSearchValue] = useState(
    "Toronto, Ontario, Canada"
  );

  // locationSearchSuggestions: [],
  // locationSearchSuggestionsLoading: false,

  // updateLocationSearchSuggestions = async (value) => {
  //   if (value) {
  //     try {
  //       this.setState({
  //         locationSearchSuggestions: [],
  //         locationSearchSuggestionsLoading: true
  //       });

  //       const res = await axios.get(
  //         `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${process.env.MAPBOX_PUBLIC_API_KEY}&cachebuster=1552757677813&autocomplete=true&country=ca&types=place&limit=5&language=en`
  //       );

  //       this.setState({
  //         locationSearchSuggestionsLoading: false,
  //         locationSearchSuggestions: res.data.features.map((feature) => ({
  //           text: feature.place_name,
  //           value: JSON.stringify({
  //             name: feature.place_name,
  //             geometry: feature.geometry
  //           })
  //         }))
  //       });
  //     } catch (e) {
  //       // TODO: Make sure to gracefully handle errors here.
  //       console.log(e.repsonse);
  //     }
  //   }
  // };

  function handleLocationSearchChange(value) {
    try {
      const parsedValue = JSON.parse(value);

      setLocationSearchValue(parsedValue.name);
    } catch (e) {
      setLocationSearchValue(value);
    }
  }

  // handleLocationSearchSelect = (value) => {
  //   const parsedValue = JSON.parse(value);

  //   this.setState({
  //     currentMapLocation: parsedValue
  //   });

  //   const [lng, lat] = parsedValue.geometry.coordinates;

  //   this.flyToMapViewport(lat, lng);
  // };

  // handleLocationSearchBlur = () => {
  //   if (!this.state.locationSearchValue.selected) {
  //     this.setState({
  //       locationSearchValue: {
  //         value: this.state.currentMapLocation.name,
  //         selected: false
  //       }
  //     });
  //   }
  // };

  return (
    <AutoComplete
      placeholder={props.placeholder}
      value={locationSearchValue}
      // dataSource={this.state.locationSearchSuggestions}

      dropdownMatchSelectWidth={false}
      // notFoundContent={
      //   this.locationSearchSuggestionsLoading ? (
      //     <Spin size="small" />
      //   ) : null
      // }

      // ref={this.locationSearchInputRef}

      onChange={handleLocationSearchChange}
      // onSearch={this.updateLocationSearchSuggestions}
      // onFocus={() =>
      //   this.setState({
      //     locationSearchValue: {
      //       value: null,
      //       selected: false
      //     }
      //   })
      // }
      // onSelect={this.handleLocationSearchSelect}
      // onBlur={this.handleLocationSearchBlur}

      css={css`
        width: 250px;
      `}
    >
      <Input
        suffix={
          <Icon
            type="environment"
            css={css`
              color: #6e6e6e;
              font-size: 16px;
              transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            `}
          />
        }
      />
    </AutoComplete>
  );
};

export default ActivitySearchInput;
