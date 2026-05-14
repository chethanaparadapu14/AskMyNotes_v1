document.addEventListener("DOMContentLoaded", function () {

    // File Upload
    const pdfInput = document.getElementById("pdf-input");
    const uploadStatus = document.getElementById("upload-status");

    pdfInput.addEventListener("change", function () {

        const file = pdfInput.files[0];

        if (!file) {

            uploadStatus.textContent =
                "No file uploaded yet.";

            uploadStatus.className =
                "mt-4 text-sm text-slate-500";

            return;
        }

        uploadStatus.textContent =
            `File "${file.name}" uploaded successfully`;

        uploadStatus.className =
            "text-sm text-green-600 mt-2 min-h-[1.25rem]";

    });



    // Question Section
    const questionEl =
        document.getElementById("question");

    const askBtn =
        document.getElementById("ask-btn");

    const statusEl =
        document.getElementById("status");

    const answerTextEl =
        document.getElementById("answer-text");

    const qtypePill =
        document.getElementById("type-pill");

    const toolPill =
        document.getElementById("tool-pill");

    const sourcesEl =
        document.getElementById("sources-wrap");

    const sourcesListEl =
        document.getElementById("sources");



    // Reset UI
    function resetAnswerUI() {

        answerTextEl.textContent =
            "Your answer will appear here...";

        qtypePill.className = "hidden";

        toolPill.className = "hidden";

        sourcesEl.classList.add("hidden");

        sourcesListEl.textContent = "";
    }



    // Submit Button
    askBtn.addEventListener("click", function () {

        const question =
            questionEl.value.trim();

        // Empty question
        if (!question) {

            statusEl.textContent =
                "Please type a question first.";

            statusEl.className =
                "text-sm text-red-500 mt-2 min-h-[1.25rem]";

            resetAnswerUI();

            return;
        }

        // Loading
        resetAnswerUI();

        statusEl.textContent =
            "Thinking...";

        statusEl.className =
            "text-sm text-gray-500 mt-2 min-h-[1.25rem]";



        setTimeout(function () {

            const lowerQuestion =
                question.toLowerCase();

            let placeholderType =
                "definition";

            if (
                lowerQuestion.startsWith("give") ||
                lowerQuestion.includes("example")
            ) {

                placeholderType =
                    "example";

            } else if (
                lowerQuestion.includes("vs") ||
                lowerQuestion.includes("compare") ||
                lowerQuestion.includes("difference")
            ) {

                placeholderType =
                    "comparison";
            }

            // Tool
            const placeholderTool =
                /^[0-9+\-*/().\s]+$/.test(question)
                ? "calculator"
                : "search_notes";

            // Answer
            answerTextEl.textContent =
                `Placeholder answer for: "${question}". Real answers will appear here once the backend is connected.`;

            // Type pill
            qtypePill.textContent =
                `type: ${placeholderType}`;

            qtypePill.className =
                "px-4 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700";

            // Tool pill
            toolPill.textContent =
                `tool: ${placeholderTool}`;

            toolPill.className =
                "px-4 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700";

            // Sources
            if (
                placeholderTool !== "calculator"
            ) {

                sourcesEl.classList.remove(
                    "hidden"
                );

                const source1 =
                    document.createElement("li");

                source1.textContent =
                    "Sample source chunk 1 — example excerpt from the uploaded notes.";

                const source2 =
                    document.createElement("li");

                source2.textContent =
                    "Sample source chunk 2 — another excerpt.";

                const source3 =
                    document.createElement("li");

                source3.textContent =
                    "Sample source chunk 3 — final excerpt.";

                sourcesListEl.appendChild(
                    source1
                );

                sourcesListEl.appendChild(
                    source2
                );

                sourcesListEl.appendChild(
                    source3
                );
            }

            // Clear status
            statusEl.textContent = "";

            statusEl.className = "";

        }, 600);

    });

});