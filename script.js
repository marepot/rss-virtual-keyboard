const keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },
  eventHandlers: {
    oninput: null,
    onclose: null,
  },
  properties: {
    value: "",
    capslock: false,
  },
   

  init() {
    //create
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");
    this.text = document.createElement("textarea");
    //setup
    this.elements.main.classList.add("keyboard", "keyboard-hidden");
    this.elements.keysContainer.classList.add("keyboard_keys");
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard_key");
      this.text.autofocus = true;
    this.text.classList.add("use-keyboard-input");
    //add DOM
    this.elements.main.appendChild(this.text);
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },
  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "`",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "+",
      "backspace",
      "tab",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "[",
      "]",
      "del",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      ";",
      "'",
      "enter",
      "shift",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "shift",
      "↑",
      "ctrl",
      "win",
      "alt",
      "space",
      "alt",
      "ctrl",
      "←",
      "↓",
      "→",
    ];
    
    //create html icon
    const createIcon = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };
    
    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["backspace", "del", "enter", "↑"].indexOf(key) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard_key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard_key-wide");
          keyElement.innerHTML = createIcon("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add(
            "keyboard_key-wide",
            "keyboard_key-activate"
          );
          keyElement.innerHTML = createIcon("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard_key-active",
              this.properties.capslock
            );
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard_key-wide");
          keyElement.innerHTML = createIcon("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard_key-extra-wide");
          keyElement.innerHTML = createIcon("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "tab":
          keyElement.classList.add("keyboard_key-wide");
          keyElement.innerHTML = createIcon("compare_arrows");
          keyElement.addEventListener("click", () => {
            this.properties.value += "   ";
            this._triggerEvent("oninput");
          });

          break;
        case "shift":
            keyElement.classList.add(
                "keyboard_key-wide",
                "keyboard_key-activate"
              );
              keyElement.innerHTML = createIcon("arrow_circle_up");
    
              keyElement.addEventListener("click", () => {
                this._toggleCapsLock();
                keyElement.classList.toggle(
                  "keyboard_key-active",
                  this.properties.capslock
                );
              });
    
              break;
              

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capslock
              ? key.toLocaleUpperCase()
              : key.toLowerCase();
            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },
 
  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },
  _toggleCapsLock() {
    this.properties.capslock = !this.properties.capslock;
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capslock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },
  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard-hidden");
  },
  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard-hidden");
  },
};
window.addEventListener("DOMContentLoaded", function () {
  keyboard.init();

});
