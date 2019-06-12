/* game.js */

(function() //nedan skapas en lista med alla frågor, svar och de rätta svaren till frågorna//
 {
          var theQuestions = //i Java snyggt att variabler har stora bostäver i sig//
          [{
              question: "What is the capital city of Afghanistan",
              options: ["Safi", "Bamyan", "Kabul", "Capri"], //svarsalternativen är även listade i en lista//
              answer: 2
          },

          {
              question: "How many legs does a spider usually have?",
              options: ["Six", "Four", "Seven", "Eight"],
              answer: 3
          },

          {
              question: "At what temperature does water boil?",
              options: ["Forty*", "Hundred*", "Ninety*","Twentyfive*"],
              answer: 1
          },

          {
              question: "Which infamous inovator sold the Iphone first?",
              options: ["Steve Jobs", "Mark Zuckerberg", "Casey james", "Deli Salmoni"],
              answer: 0
          },

          {
              question: "What is the chamical formula for carbondioxide?",
              options: ["HC3", "CO2", "H2O", "C4O"],
              answer: 1
          },

          {
              question: "What is the slogan of New York City?",
              options: ["The Big Apple", "The city of dreams", "The lantern city", "China town"],
              answer: 0
          },

          {
              question: "What is the second highest mountain in the world?",
              options: ["K2", "Mount Everest", "The Himalaya", "Gangerest"],
              answer: 0
          },

          {
              question: "What does HTML stand for?",
              options: ["HydroTrueManualLesson", "HenceTextManualLanguage", "HyperTrueMarkeupListor", "HyperTextMarkupLanguage"],
              answer: 3
          },

          {
              question: "What do Christianity, Islam and Judaism spacifically have in common?",
              options: ["World Religions", "Famous Religions", "Abrahamitic Religions", "Religions"],
              answer: 2
          },

          {
              question: "What is the makeup that is put on the eyelashes called?",
              options: ["Masccara", "Eyeliner", "Lashcurler", "Cayal"],
              answer: 0
          }]; //stängs listan//



  var questionCount = 0; //frågorna är i en lista, questioncount räknar alla frågor och bröjar med första som 0//
  var optionsSelection = [];  //de svarsalternativ som finns//
  var quizSpace = $('#quiz');

  followQuestion(); //nästa fråga, koden finns längre ned i filen//

      //när man klickar på next och previousboxarna//
      $('#nextq').click(function () //här öppnar parentesen, nextq boxen när man klickar, måste man ha valt ett svarsalternativ, då går vidare//
      {
            optionChoose();

                if (isNaN(optionsSelection[questionCount])) //om ej valt svarsalternativ, alertas man, kan ej gå vidare//
                {
                      alert('You must select an option before going to next question!');
                }
                else //om man valt svarsalternativ, går man vidare och det räknas på varje gång och nästa fråga visas//
                {
                      questionCount++;
                      followQuestion();
                }
      }); //här stängs function med parentesen//

      $('#previousq').click(function () //Här öppnas function parentesen//
      {
            optionChoose();
            questionCount--;
            followQuestion();
      }); //här stängs function med parentesen//



  function createElement(index) //Här skapas index för varjefråga.//
  {
            var element = $('<div>',{id: 'question'});
            var title = $('<h2> Question Number ' + (index + 1) + ' :</h2>'); //title på fråga blir då question number och så adderas den med 1 efter varje avklarad fråga//
            element.append(title);

            var ask = $('<p>').append(theQuestions[index].question);
            element.append(ask); //beroende på villket tal i question listan som index är på, den frågan visas på sidan//

            var selectionbox = answerBox(index);
            element.append(selectionbox); //här visas svarsalternativen beroende på villket tal index e på på listan//

            return element;  //från denna function skickas element till createelEment//
  }




  function answerBox(index) //Här skapas svarsalternativboxarne, med hjälp av unordered list//
  {
          var selecTions = $('<ul>'); //alternativ listas som ul//
          var box;
          var input = '';


              for (var i = 0; i < theQuestions[index].options.length; i++) //foreloop,listan avv alternativen från frågorlistan i början//
              {
                  box = $('<li>'); //svarsalternativen i lista, li//
                  input = '<input type="radio" name="answer" value=' + i + ' />';
                  input += theQuestions[index].options[i]; //input är svarsalternativen till frågorn i en lista längst upp i dokumentet//
                  box.append(input); //Boxarna skall visa alternativen, foreloop gör att den kommer att visa alternativen på varje fråga//
                  selecTions.append(box);
                }

          return selecTions; //Denna function returnar svarsalternativen//
  }



  function optionChoose()
  {
        optionsSelection[questionCount] = +$('input[name="answer"]:checked').val(); //de spelaren valt//
  }




  function followQuestion() //nästa fråga//
  {
        quizSpace.fadeOut(function()//parentes till function öppnad//
        {
            $('#question').remove();

                  if(questionCount < theQuestions.length)
                  {
                        var followQuestion = createElement(questionCount);
                        quizSpace.append(followQuestion).fadeIn();

                            if (!(isNaN(optionsSelection[questionCount])))
                            {
                              $('input[value='+optionsSelection[questionCount]+']').prop('checked', true);
                            }

                            if(questionCount === 1) //om typ och variabelns, antal frågor passerade värde är 1, så får previousboxen visas//
                            {
                              $('#previousq').show();
                            }

                            else if(questionCount === 0) //Annars om 0, skall previous inte visas, men endast nextboxen skallvisas//
                            {
                              $('#previousq').hide();
                              $('#nextq').show();
                            }
                  }

                  else
                  {
                        var score = showResults();
                        quizSpace.append(score).fadeIn();
                        $('#nextq').hide();
                        $('#previousq').hide(); //när resultatet visas i slutet av spelet, skall varken previous eller next visas//
                  }

        }); //parentes till function stängd//
  }




  function showResults()
  {
        var results = $('<p>',{id: 'question'});
        var right = 0;

              for (var i = 0; i < optionsSelection.length; i++) //om det valda svarsalternativer = frågans svar, så får man ett poäng
              {
                  if (optionsSelection[i] === theQuestions[i].answer)
                  {
                    right++; //ett poäng extra varje rätt//
                  }

              }

        results.append('You scored ' + right + ' out of ' +theQuestions.length); //results visar sammanlagt vad du fått, right, utav alla frågor//
        return results; //resultatet returneras//
  }


})();
