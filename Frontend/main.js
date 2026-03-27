import { app, BrowserWindow, screen, globalShortcut } from "electron";
import path from "path";
import isDev from "electron-is-dev";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let overlayWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const url = isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(url);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => (mainWindow = null));
}

function createOverlayWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  overlayWindow = new BrowserWindow({
    width: 400,
    height: 300,
    x: width - 420,
    y: 50,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const url = isDev
    ? "http://localhost:5173#/overlay"
    : `file://${path.join(__dirname, "../build/index.html#/overlay")}`;

  overlayWindow.loadURL(url);

  // overlayWindow.setIgnoreMouseEvents(true); // Optional: make it click-through
  overlayWindow.on("closed", () => (overlayWindow = null));
}

app.whenReady().then(() => {
  createMainWindow();
  createOverlayWindow();

  // Global hotkey to toggle overlay visibility
  globalShortcut.register('CommandOrControl+Shift+H', () => {
    if (overlayWindow) {
      if (overlayWindow.isVisible()) {
        overlayWindow.hide();
      } else {
        overlayWindow.show();
      }
    }
  });

  // Make overlay click-through by default when not focused
  if (overlayWindow) {
    overlayWindow.setIgnoreMouseEvents(true, { forward: true });
    
    // Optional: Bring back mouse control when user hovers or clicks specific areas if needed
    // For now, absolute invisibility/non-interference is preferred
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
