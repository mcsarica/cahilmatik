/** Simple JavaScript Quiz
     * version 0.1.0
     * http://journalism.berkeley.edu
     * created by: Jeremy Rue @jrue
     *
     * Copyright (c) 2013 The Regents of the University of California
     * Released under the GPL Version 2 license
     * http://www.opensource.org/licenses/gpl-2.0.php
     * This program is distributed in the hope that it will be useful, but
     * WITHOUT ANY WARRANTY; without even the implied warranty of
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
     */

    var quiztitle = "Cehalet Ölçer";

    /**
    * Set the information about your questions here. The correct answer string needs to match
    * the correct choice exactly, as it does string matching. (case sensitive)
    *
    */
	var cc="http://cahilmatik.net/img/r1.png";
	var zc="http://cahilmatik.net/img/r2.png";
	var ko="http://cahilmatik.net/img/r3.png";
	
    var quiz = [
        {
            "question"      :   "Matbaayı Osmanlı Devletine getiren İbrahim Müteferrika'nın ölümünden sonra basılan ilk kitap hangisidir?",
            "image"         :   "",
            "choices"       :   [
                                    "Divanü Lügati Türk",
                                    "Vankulu Lugati",
                                    "Tarih-i Seyyah",
                                    "Cihan-nüma"
                                ],
            "correct"       :   "Vankulu Lugati",
            "explanation"   :   "",
        },
        {
            "question"      :   "Osmanlı Devletinde ilk fethedilen ada hangisidir?",
            "image"         :   "",
            "choices"       :   [
                                    "Rodos",
                                    "Bozcaada",
                                    "Kıbrıs",
                                    "İmralı"
                                ],
            "correct"       :   "İmralı",
            "explanation"   :   "",
        },
		{
            "question"      :   "Albert Einstein'nın İkimizden biri muhtemelen doğru. Senin teorin benimkinden daha kapsamlı. Fakat zaman gösterecek. mektubunda dediği ve Genelleştirilmiş İzafiyet Kuramını bulan ünlü Türk fizikçi kimdir?",
            "image"         :   "",
            "choices"       :   [
                                    "Feza Gürsey",
                                    "Engin Arık",
                                    "Erdal İnönü",
                                    "Behram Kurşunoğlu"
                                ],
            "correct"       :   "Behram Kurşunoğlu",
            "explanation"   :   "",
        },
        {
            "question"      :   "Tarihte sıfır sayısını ilk hangi bilgin kullanmıştır?",
            "image"         :   "",
            "choices"       :   [
                                    "El-Cezeri",
                                    "İbn-i Sina",
                                    "Harezmi",
                                    "Battani"
                                ],
            "correct"       :   "Harezmi",
            "explanation"   :   "",
        },

    ];


    /******* No need to edit below this line *********/
    var currentquestion = 0, score = 0, submt=true, picked;

    jQuery(document).ready(function($){

        /**
         * HTML Encoding function for alt tags and attributes to prevent messy
         * data appearing inside tag attributes.
         */
        function htmlEncode(value){
          return $(document.createElement('div')).text(value).html();
        }

        /**
         * This will add the individual choices for each question to the ul#choice-block
         *
         * @param {choices} array The choices from each question
         */
        function addChoices(choices){
            if(typeof choices !== "undefined" && $.type(choices) == "array"){
                $('#choice-block').empty();
                for(var i=0;i<choices.length; i++){
                    $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).attr('value',20).text(choices[i]).appendTo('#choice-block');                    
                }
            }
        }
        
        /**
         * Resets all of the fields to prepare for next question
         */
        function nextQuestion(){
            submt = true;
            $('#explanation').empty();
            $('#question').text(quiz[currentquestion]['question']);
            $('#pager').text('Sorular ' + Number(currentquestion + 1) + ' - ' + quiz.length);
            if(quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != ""){
                if($('#question-image').length == 0){
                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
                } else {
                    $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
                }
            } else {
                $('#question-image').remove();
            }
            addChoices(quiz[currentquestion]['choices']);
            setupButtons();
        }

        /**
         * After a selection is submitted, checks if its the right answer
         *
         * @param {choice} number The li zero-based index of the choice picked
         */
        function processQuestion(choice){
            if(quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']){
                $('.choice').eq(choice).css({'background-color':'#40d480'});
                $('#explanation').html('<strong>Bu seferlik doğru!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
                score++;
            } else {
                $('.choice').eq(choice).css({'background-color':'#e81b39'});
                $('#explanation').html('<strong>Seni cahil yine bilemedin.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
            }
            currentquestion++;
            $('#submitbutton').html('Sonraki soru &raquo;').on('click', function(){
                if(currentquestion == quiz.length){
                    endQuiz();
                } else {
                    $(this).html('<div>devam</div>').css({'color':'#222'}).off('click');
                    nextQuestion();
                }
            })
        }

        /**
         * Sets up the event listeners for each button.
         */
        function setupButtons(){
            $('.choice').on('mouseover', function(){
                $(this).css({'background-color':'#40D480'});
            });
            $('.choice').on('mouseout', function(){
                $(this).css({'background-color':'#fff'});
            })
            $('.choice').on('click', function(){
                picked = $(this).attr('data-index');
                $('.choice').removeAttr('style').off('mouseout mouseover');
                $(this).css({'border-color':'#222','font-weight':700,'background-color':'#c1c1c1'});
                if(submt){
                    submt=false;
                    $('#submitbutton').css({'color':'#000'}).on('click', function(){
                        $('.choice').off('click');
                        $(this).off('click');
                        processQuestion(picked);
                    });
                }
            })
        }
        
        /**
         * Quiz ends, display a message.
         */
        function endQuiz(){
            $('#explanation').empty();
            $('#question').empty();
            $('#choice-block').empty();
            $('#submitbutton').remove();
            $('#question').text( quiz.length + " soruda " + score + " doğrun var.").css({'text-align':'center'});
            $(document.createElement('h2')).css({'text-align':'center', 'font-size':'4em'}).text('%'+Math.round(score/quiz.length * 100)).insertAfter('#question');
			if (score<1)
			{
			$(document.createElement('img')).attr('src',ko).insertAfter('#question').addClass('center-block');
			}
			if (score<2)
			{
			$(document.createElement('img')).attr('src',zc).insertAfter('#question').addClass('center-block');
			}
			else
			$(document.createElement('img')).attr('src',cc).insertAfter('#question').addClass('center-block');
			
        }

        /**
         * Runs the first time and creates all of the elements for the quiz
         */
        function init(){
            //add title
            if(typeof quiztitle !== "undefined" && $.type(quiztitle) === "string"){
                $(document.createElement('h1')).css({'text-align':'center', 'font-size':'4em'}).text(quiztitle).appendTo('#frame');
            } else {
                $(document.createElement('h1')).text("Quiz").appendTo('#frame');
            }

            //add pager and questions
            if(typeof quiz !== "undefined" && $.type(quiz) === "array"){
                //add pager
                $(document.createElement('p')).addClass('pager').attr('id','pager').text('Sorular 1 - ' + quiz.length).appendTo('#frame');
                //add first question
                $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
                //add image if present
                if(quiz[0].hasOwnProperty('image') && quiz[0]['image'] != ""){
                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
                }
                $(document.createElement('p')).addClass('explanation').attr('id','explanation').html('&nbsp;').appendTo('#frame');
            
                //questions holder
                $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');
            
                //add choices
                addChoices(quiz[0]['choices']);
            
                //add submit button
                $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').html('<div>devam</div>').css({'font-weight':700,'color':'#222','padding':'30px 0','vertical-align':'center','border-radius':'20px', 'text-align':'center','border':'1px solid','background':'red','border-color':'red','width':'120px','height':'30px','float':'right','font-size':'large','cursor':'pointer'}).appendTo('#frame');
				            
                setupButtons();
            }
        }
        
        init();
		
    });