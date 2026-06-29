export async function checkYtDlp() {
  return { available: true, version: "2024.01.01" };
}

export async function listStagedFiles() {
  return [];
}

export async function deleteStagedFile() {
  return { success: true };
}

export async function renameStagedFile() {
  return { success: true };
}
