export const getVoivodeshipsWiki = (state) => state.voivodeships.voivodeships.get('wiki').toArray();

export const getCheckedVoivodeshipId = (state) => state.voivodeships.voivodeships.get('checked_voivodeship');

export const getWikiForChosenVoivodeship = (state) => {
  const cartodb_id = getCheckedVoivodeshipId(state);
  if( cartodb_id ){
    const voivodeships = getVoivodeshipsWiki(state);
    return voivodeships[ cartodb_id ];
  }
  return null;
}
