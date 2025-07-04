// ==UserScript==
// @name         Fahren-Lernen Google-Suche
// @namespace    https://github.com/Tapetenputzer/Fahren-Lernen-Google-Suche
// @version      1.1
// @description  Extrahiert Frage + (optional) Antworten und öffnet Google-Suche im neuen Tab
// @match        *://*fahren-lernen.de/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function searchOnGoogle() {
       
        const questionLabel = document.querySelector("label.audio-label");
        if (!questionLabel) {
            alert("Frage nicht gefunden");
            return;
        }

        const questionText = questionLabel.innerText.trim();

       
        const answerLabels = document.querySelectorAll(".multiple-choice-answer label.audio-label");
        const answerTexts = Array.from(answerLabels).map(label => label.innerText.trim());

        let fullText = questionText;

        if (answerTexts.length > 0) {
            fullText += " " + answerTexts.join(" ");
        }

       
        const searchQuery = fullText.replace(/\s+/g, ' ').substring(0, 300);
        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

        window.open(googleUrl, '_blank');
    }

    
    const searchButton = document.createElement("button");
    searchButton.innerText = "";
    searchButton.style.position = "fixed";
    searchButton.style.top = "10px";
    searchButton.style.right = "10px";
    searchButton.style.zIndex = "9999";
    searchButton.style.padding = "10px 15px";
    searchButton.style.backgroundColor = "#28a745";
    searchButton.style.color = "#fff";
    searchButton.style.border = "none";
    searchButton.style.borderRadius = "5px";
    searchButton.style.cursor = "pointer";
    searchButton.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";

    searchButton.addEventListener("mouseover", () => {
        searchButton.style.backgroundColor = "#218838";
    });
    searchButton.addEventListener("mouseout", () => {
        searchButton.style.backgroundColor = "#28a745";
    });

   
    document.body.appendChild(searchButton);
    searchButton.addEventListener("click", searchOnGoogle);
})();
