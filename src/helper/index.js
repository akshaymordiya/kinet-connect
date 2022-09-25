export const isStringContainsSpecialChars = (string) => {
  const specialChars = /([^}{]+)(?=})/g

  if(!specialChars.test(string)){
    return false;
  }

  return true;
}

export const formateMessage = (string, obj = {}) => {
  let resultedText = string;
  
  if(!isStringContainsSpecialChars(string)) {
    return resultedText;
  }

  for(let prop in obj) {
    resultedText = resultedText.replace(new RegExp('{'+ prop +'}','g'), obj[prop]);
  }
  
  return resultedText;
}

export const isValidEmail = (value = "") => {
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  return filter.test(value);
}

export const isValidPassword = (value = "") => {
  const decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  return value.match(decimal);
}

export const getParticipantsWithRemainingComputation = (participants = [], limit = 4) => {
  const resultedParticipantsList = [];
    let iteration = 0;
    do {
      const participant = participants[iteration];
      if(participant){
        if(iteration === limit){
          resultedParticipantsList[limit - 1] = {
            showMessage: `${participants.length - (limit - 1)}+`
          }
        }else {
          resultedParticipantsList.push(participant);
        }
        iteration++;
      }else {
        iteration = (limit + 1);
      }
    } while (iteration <= limit);

    return resultedParticipantsList;
}

export const checkIsDefaultImage = (src, defaultImageOptions = []) => {
  return defaultImageOptions.includes(src);
}