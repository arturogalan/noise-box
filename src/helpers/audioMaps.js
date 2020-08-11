// import {AMP_COMPONENT_PROPERTIES} from '../store/constants';

const audioMaps = {
  // AMP_TYPES: Noisefy.AMP_TYPES,
  // getNormalizedSettingValue(compName, setName, value) {
  //   const component = AMP_COMPONENT_PROPERTIES[compName];
  //   const settingList = (component || {}).settingList || [];
  //   const setting = settingList.find((setting)=> setting.name === setName);
  //   return value * 10;
  // },
  // setNormalizedSettingValue(compName, setName, value) {
  //   const component = AMP_COMPONENT_PROPERTIES[compName];
  //   const settingList = (component || {}).settingList || [];
  //   const setting = settingList.find((setting)=> setting.name === setName);
  //   return value / 10;
  // },
  getNormalizedSettingValue (value) {
    return value * 10
  },
  setNormalizedSettingValue (value) {
    return value / 10
  },
}

export default audioMaps
