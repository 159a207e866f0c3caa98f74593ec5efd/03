const canvasE = document.getElementById("canvasE").getContext("2d");
const canvasI = document.getElementById("canvasI").getContext("2d");

let plotE = undefined;
let plotI = undefined;

const setup = () => {
  plotE = new Chart(canvasE, {
    type: "line",
    data: { datasets: [] },
  });
  plotI = new Chart(canvasI, {
    type: "line",
    data: { datasets: [] },
  });

  const [b, s, v, r] = [3, 1, 0.5, 5];

  document.getElementById("b").value = b;
  document.getElementById("s").value = s;
  document.getElementById("v").value = v;
  document.getElementById("r").value = r;
  make_plot(make_data(b, s, v, r));
}

const make_plot_e = (data) => {
  plotE.destroy();
  plotE = new Chart(canvasE, {
    type: "line",
    data: {
      datasets: [
        {
          label: "εᵢ(t)",
          borderColor: "rgba(66, 200, 222, .8)",
          data: data,
          lineTension: 0.4,
          pointRadius: 0
        },
      ]
    },
    options: {
      bezierCurve: false,
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: { display: true, text: "t, c" }
        },
        y: {
          type: "linear",
          position: "left",
          title: { display: true, text: "εᵢ, В" }
        }
      },
      layout: {
        padding: 50,
      },
    }
  });
}

const make_plot_i = (data) => {
  plotI.destroy();
  plotI = new Chart(canvasI, {
    type: "line",
    data: {
      datasets: [
        {
          label: "I(t)",
          borderColor: "rgba(200, 77, 123, .8)",
          data: data,
          lineTension: 0.4,
          pointRadius: 0
        },
      ]
    },
    options: {
      bezierCurve: false,
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: { display: true, text: "t, c" }
        },
        y: {
          type: "linear",
          position: "left",
          title: { display: true, text: "I, A" }
        }
      },
      layout: {
        padding: 50,
      },
    }
  });
}

const make_plot = (data) => {
  make_plot_e(data.e);
  make_plot_i(data.i);
}

const make_data = (b, s, v, r) => {
  const omega = 2 * Math.PI * v;
  const step = (1 / v) / 9;
  const right_border = 200 * step;
  const result = { e: [], i: [] };

  for (let t = 0; t < right_border; t += step) {
    const e = b * s * omega * Math.sin(omega * t);
    const i = e / r;
    result.e.push({ x: t, y: e });
    result.i.push({ x: t, y: i });
  }

  return result;
}

const parse_input = () => {
  return [
    parseFloat(document.getElementById("b").value),
    parseFloat(document.getElementById("s").value),
    parseFloat(document.getElementById("v").value),
    parseFloat(document.getElementById("r").value),
  ]
}

const run = () => {
  const [b, s, v, r] = parse_input();
  if (isNaN(b) || isNaN(s) || isNaN(v) || isNaN(r)) {
    alert("Некорретный ввод!");
    return;
  }
  if (b <= 0 || s <= 0 || v <= 0 || r <= 0) {
    alert("Некорретный ввод!");
    return;
  }
  make_plot(make_data(b, s, v, r));
}

