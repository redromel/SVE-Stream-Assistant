

export async function updateLifeP1(obs, score) {
  try {
    await obs.call("SetInputSettings", {
      inputName: "P1_Score",
      inputSettings: { text: String(score) },
    });
    console.log(`OBS Text updated to: ${score}`);
  } catch (error) {
    console.error("Failed to change score:", error.message);
  }
}
export async function getScoreP1(obs) {
  try {
    const response = await obs.call("GetInputSettings", {
      inputName: "P1_Score",
    });

    const currentText = response.inputSettings?.text;
    console.log(`Text is:  ${currentText}`);
    return currentText;
  } catch (error) {
    console.error(`Failed to read source text for P1_Score":`, error.message);
    return null;
  }
}

