// Career GPS — Sprint 0 clickable shell.
// Plain JavaScript, no build step, so index.html opens with a double-click.
(function () {
  "use strict";

  var D = window.DEMO;
  var S = window.STRINGS;
  var app = document.getElementById("app");

  var Q = window.PROFILE_QUESTIONS;

  var state = {
    style: "o",       // "o" = Night Sky with orange accent (default), "b" = Night Sky original
    lang: "en",
    screen: "home",
    history: [],
    showWhy: false,
    answers: {},      // demo only: kept in memory, never saved
    qStack: []        // which "About you" questions have been shown, for Back
  };

  // ---------- settings: URL first (?style=b&lang=kn), then remembered choice ----------
  var params = new URLSearchParams(location.search);
  state.style = params.get("style") || load("cgps.style") || "o";
  if (state.style !== "b") state.style = "o"; // style A was retired on 2026-10-01
  state.lang = params.get("lang") || load("cgps.lang") || "en";
  var pack = D.statePacks[D.family.state];
  if (pack.languages.indexOf(state.lang) === -1) state.lang = "en"; // e.g. Kannada remembered from before the state was chosen
  var embedded = params.get("embed") === "1";
  if (params.get("screen")) state.screen = params.get("screen"); // direct link to a screen, e.g. ?screen=parent-plan
  if (embedded) document.body.classList.add("embedded");

  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode: ignore */ } }

  function t(key) {
    var pack = S[state.lang] || S.en;
    if (Object.prototype.hasOwnProperty.call(pack, key)) return pack[key];
    return Object.prototype.hasOwnProperty.call(S.en, key) ? S.en[key] : key;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // A figure is shown only when it is fully sourced; otherwise its [placeholder].
  // Same test as scripts/check-data.js: value + https source link + as-of date + reviewer.
  function isVerified(f) {
    return f.value != null && f.source && /^https:\/\//.test(f.source.url || "") && f.asOf && f.reviewer;
  }
  function fig(id) {
    var f = D.figures[id];
    if (!f) return '<span class="ph">[missing figure]</span>';
    if (isVerified(f)) return '<span class="fig">' + esc(f.value) + '</span>';
    return '<span class="ph" title="No checked source yet">' + esc(f.placeholder) + "</span>";
  }
  function sourceNote(id) {
    var f = D.figures[id];
    if (!isVerified(f)) return '<span class="src">Source: not checked yet</span>';
    return '<span class="src">Source: <a href="' + esc(f.source.url) + '" target="_blank" rel="noopener">' +
      esc(f.source.title || f.source.url) + "</a>, as of " + esc(f.asOf) + "</span>";
  }

  // State names come from the state pack, never typed into route text (spec §3).
  function fillState(text) {
    return text.replace(/\{(stateName|class12Name|stateCounselling)\}/g, function (_, k) {
      return k === "stateName" ? pack.name : pack[k];
    });
  }

  function label(kind) {
    var text = { researched: "Researched", example: "Example · not yet checked", planned: "Planned · not built yet" }[kind];
    return '<span class="label label-' + kind + '">' + text + "</span>";
  }

  function listenBtn(text) {
    return '<button type="button" class="listen" data-say="' + esc(text) + '"><span aria-hidden="true">🔊</span> ' + esc(t("listen")) + "</button>";
  }

  // extra: an optional navigation button on the right (e.g. "Change answers").
  function navBar(title, extra) {
    return '<div class="navbar"><button type="button" class="nav-back" data-action="back">← ' + esc(t("back")) + "</button>" +
      (title ? '<span class="nav-title">' + esc(title) + "</span>" : "") +
      (extra || "") + "</div>";
  }

  // ---------- illustrations ----------
  var ART = {
    parent:
      '<svg viewBox="0 0 160 120" aria-hidden="true">' +
      '<circle cx="80" cy="64" r="54" class="art-halo"/>' +
      '<circle cx="62" cy="38" r="15" class="art-skin"/>' +
      '<path d="M40 104c0-22 10-40 22-40s22 18 22 40z" class="art-main"/>' +
      '<circle cx="104" cy="58" r="11" class="art-skin"/>' +
      '<path d="M88 104c0-16 7-30 16-30s16 14 16 30z" class="art-alt"/>' +
      '<path d="M80 80c6-4 12-4 16 0" class="art-line"/>' +
      "</svg>",
    child:
      '<svg viewBox="0 0 160 120" aria-hidden="true">' +
      '<circle cx="80" cy="64" r="54" class="art-halo"/>' +
      '<path d="M118 22l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" class="art-star"/>' +
      '<circle cx="76" cy="44" r="15" class="art-skin"/>' +
      '<path d="M52 106c0-22 11-40 24-40s24 18 24 40z" class="art-main"/>' +
      '<path d="M98 76l18-22" class="art-line"/>' +
      "</svg>"
  };

  // ---------- screens ----------
  var screens = {
    home: function () {
      var note = t("translationNote");
      return (
        '<section class="screen screen-home">' +
        '<h1 class="big-q">' + esc(t("whoIsUsing")) + "</h1>" +
        '<p class="hint">' + esc(t("whoHint")) + " " + listenBtn(t("whoIsUsing") + " " + t("parent") + ". " + t("child") + ".") + "</p>" +
        '<div class="role-grid">' +
        roleCard("parent") + roleCard("child") +
        "</div>" +
        (note ? '<p class="tr-note">' + esc(note) + "</p>" : "") +
        '<p class="screen-foot screen-foot-center">' + label("example") + "</p>" +
        "</section>"
      );
    },

    "child-dreams": function () {
      var c = D.family.child;
      return (
        '<section class="screen">' + navBar() +
        '<div class="kid-hello"><span class="kid-avatar" aria-hidden="true">🙂</span><div>' +
        '<p class="kid-hi">Hi ' + esc(c.firstName) + "!</p>" +
        '<h1 class="screen-title">What do you dream of being?</h1></div></div>' +
        '<div class="dream-grid">' +
        D.careers.map(function (k) {
          return '<button type="button" class="dream-card' + (k.ready ? "" : " is-locked") + '" data-go="' + (k.ready ? "child-road" : "child-soon") + '" data-career="' + k.id + '">' +
            '<span class="dream-icon" aria-hidden="true">' + k.icon + "</span>" +
            '<span class="dream-name">' + esc(k.name) + "</span>" +
            (k.ready ? '<span class="dream-cta">Let\'s go ▶</span>' : '<span class="dream-cta">🔒 Coming soon</span>') +
            "</button>";
        }).join("") +
        "</div>" +
        '<p class="screen-foot">' + label("example") + " More careers: search is planned.</p>" +
        "</section>"
      );
    },

    "child-soon": function () {
      return (
        '<section class="screen">' + navBar() +
        '<div class="soon"><span class="soon-icon" aria-hidden="true">🔒</span>' +
        '<h1 class="screen-title">This road is being built</h1>' +
        "<p>This road is still being drawn. Come back soon!</p></div>" +
        '<p class="screen-foot">' + label("planned") + "</p></section>"
      );
    },

    "child-road": function () {
      var r = D.routes.cardiologist;
      var here = r.steps.findIndex(function (s) { return s.id === r.childPosition; });
      return (
        '<section class="screen">' + navBar() +
        '<h1 class="screen-title">Your road to <span class="hl">Heart doctor</span></h1>' +
        '<ol class="road">' +
        r.steps.map(function (s, i) {
          var cls = i < here ? "done" : i === here ? "next" : "later";
          return '<li class="stone stone-' + cls + '" style="--i:' + i + '">' +
            '<span class="stone-icon" aria-hidden="true">' + s.icon + "</span>" +
            '<span class="stone-text">' + esc(s.child) + "</span>" +
            (i === here ? '<span class="you">Next stop</span>' : "") +
            "</li>";
        }).join("") +
        "</ol>" +
        '<div class="quest">' +
        '<span class="quest-badge" aria-hidden="true">⭐</span>' +
        '<div><p class="quest-kicker">Quest 1</p>' +
        '<p class="quest-text">Ask your science teacher: what do Biology students learn?</p></div>' +
        '<button type="button" class="quest-done" data-action="quest">Done!</button>' +
        "</div>" +
        '<p class="screen-foot">' + label("example") + " Steps come from our draft path. Rules can change each year.</p>" +
        "</section>"
      );
    },

    "parent-about": function () {
      var q = currentQuestion();
      var shown = Q.filter(applies);
      var pos = shown.indexOf(q);
      return (
        '<section class="screen">' + navBar("About you") +
        '<div class="q-progress" aria-label="Question ' + (pos + 1) + " of " + shown.length + '">' +
        shown.map(function (_, i) { return '<span class="' + (i <= pos ? "on" : "") + '"></span>'; }).join("") +
        "</div>" +
        '<h1 class="q-title">' + esc(q.q) + "</h1>" +
        (q.sub ? '<p class="q-sub">' + esc(q.sub) + "</p>" : "") +
        '<div class="q-grid">' +
        optionsOf(q).map(function (o) {
          return '<button type="button" class="q-card" data-answer="' + o.v + '" aria-pressed="' + (state.answers[q.id] === o.v) + '">' +
            '<span class="q-icon" aria-hidden="true">' + o.icon + "</span>" +
            '<span class="q-name">' + optionText(o) + "</span>" +
            (o.hint ? '<span class="q-hint">' + esc(o.hint) + "</span>" : "") +
            "</button>";
        }).join("") +
        "</div>" +
        '<div class="q-actions">' +
        (q.skip ? '<button type="button" class="q-skip" data-action="skip">' + esc(q.skip) + " →</button>" : "<span></span>") +
        '<p class="q-private">🔒 Demo: answers are not saved.</p>' +
        "</div>" +
        '<p class="screen-foot">' + label("example") + " Questions are a first draft for testing with families.</p>" +
        "</section>"
      );
    },

    "parent-plan": function () {
      var c = D.family.child;
      var hasAnswers = Object.keys(state.answers).length > 0;
      return (
        '<section class="screen">' +
        navBar("", hasAnswers ? '<button type="button" class="nav-extra" data-action="redo-about">✏️ Change answers</button>' : "") +
        '<p class="kicker">' + esc(c.firstName) + "’s plan · Heart doctor · " + esc(pack.name) + "</p>" +
        aboutSummary() +
        '<div class="big-number">' +
        '<p class="bn-lead">About</p>' +
        '<p class="bn-value"><span class="nw">₹' + fig("monthlySavingLow") + '–</span><span class="nw">₹' + fig("monthlySavingHigh") + "</span></p>" +
        '<p class="bn-unit">a month (estimate)</p>' +
        '<p class="bn-note">Information, not financial advice.</p>' +
        '<button type="button" class="why" data-action="why" aria-expanded="' + state.showWhy + '">' + (state.showWhy ? "Hide details ▲" : "Where does this come from? ▼") + "</button>" +
        (state.showWhy ? whyPanel() : "") +
        "</div>" +
        '<div class="choice-row">' +
        choice("parent-road", "🗺️", "See the road") +
        choice("parent-save", "🏦", "Where to save") +
        choice("parent-adviser", "🧑‍💼", "Talk to an adviser") +
        "</div>" +
        '<p class="screen-foot">' + label("example") + " Numbers stay as [brackets] until checked against official sources.</p>" +
        "</section>"
      );
    },

    "parent-road": function () {
      var r = D.routes.cardiologist;
      return (
        '<section class="screen">' + navBar("The road, step by step") +
        '<ol class="timeline">' +
        r.steps.map(function (s) {
          var figs = s.figures.map(function (id) {
            return '<span class="tl-fig"><span class="tl-fig-label">' + esc(D.figures[id].label) + ":</span> " + fig(id) + " " + sourceNote(id) + "</span>";
          }).join("");
          return '<li class="tl-step"><span class="tl-dot" aria-hidden="true">' + s.icon + "</span>" +
            '<div class="tl-body"><p class="tl-title">' + esc(fillState(s.parent)) + "</p>" +
            (figs ? '<details class="tl-details"><summary>Costs and rules</summary><p class="tl-figs">' + figs + "</p></details>" : "") +
            (s.mayChange ? '<p class="tl-warn">⚠ Rules can change. Check that year’s official notice.</p>' : "") +
            "</div></li>";
        }).join("") +
        "</ol>" +
        '<p class="screen-foot">' + label("example") + " " + esc(r.sourceNote) + "</p>" +
        "</section>"
      );
    },

    "parent-save": function () {
      return (
        '<section class="screen">' + navBar("Where to save") +
        '<p class="lede">Three kinds of places. We explain them; we do not pick one for you.</p>' +
        '<div class="save-grid">' +
        D.saveGroups.map(function (g) {
          return '<article class="save-card"><span class="save-icon" aria-hidden="true">' + g.icon + "</span>" +
            '<h2 class="save-name">' + esc(g.name) + "</h2>" +
            '<p class="save-ex">' + esc(g.examples) + "</p>" +
            '<p class="save-risk"><span aria-hidden="true">⚠</span> ' + esc(g.risk) + "</p></article>";
        }).join("") +
        "</div>" +
        '<p class="notice">Information only, not financial advice. Rates change; confirm with the provider before acting.</p>' +
        '<button type="button" class="adviser-btn" data-go="parent-adviser">🧑‍💼 Talk to a registered adviser</button>' +
        '<p class="screen-foot">' + label("example") + " Product details, rates and dates come in a later build.</p>" +
        "</section>"
      );
    },

    "parent-adviser": function () {
      return (
        '<section class="screen">' + navBar("Talk to an adviser") +
        '<div class="soon"><span class="soon-icon" aria-hidden="true">🧑‍💼</span>' +
        '<h1 class="screen-title">For a personal plan, talk to a registered adviser</h1>' +
        "<p>In India, look for a SEBI-registered investment adviser. In Canada, a licensed adviser.</p>" +
        "<p>Career GPS gives information only. We never take money to show one bank or product above another.</p></div>" +
        '<p class="screen-foot">' + label("planned") + " A list of how to find one is not built yet.</p></section>"
      );
    }
  };

  function roleCard(role) {
    var go = role === "parent" ? "parent-about" : "child-dreams";
    return '<button type="button" class="role-card role-' + role + '" data-go="' + go + '">' +
      '<span class="role-art">' + ART[role] + "</span>" +
      '<span class="role-name">' + esc(t(role)) + "</span>" +
      '<span class="role-sub">' + esc(t(role + "Sub")) + "</span>" +
      "</button>";
  }

  function choice(go, icon, text) {
    return '<button type="button" class="choice" data-go="' + go + '"><span class="choice-icon" aria-hidden="true">' + icon + '</span><span>' + esc(text) + "</span></button>";
  }

  // ---------- "About you" question flow ----------
  function applies(q) {
    if (!q.when) return true;
    return Object.keys(q.when).every(function (k) { return q.when[k].indexOf(state.answers[k]) !== -1; });
  }
  function optionsOf(q) {
    return q.sameOptionsAs ? Q.filter(function (x) { return x.id === q.sameOptionsAs; })[0].options : q.options;
  }
  function optionText(o) {
    if (o.fig) return fig(o.fig);
    var partner = { mother: "Child’s father", father: "Child’s mother" }[state.answers.who] || "Child’s parent";
    return esc(o.t.replace("{partner}", partner));
  }
  function currentQuestion() {
    if (!state.qStack.length) state.qStack.push(Q[0].id);
    var id = state.qStack[state.qStack.length - 1];
    return Q.filter(function (x) { return x.id === id; })[0];
  }
  function nextQuestion() {
    var i = Q.indexOf(currentQuestion());
    for (var j = i + 1; j < Q.length; j++) {
      if (applies(Q[j])) { state.qStack.push(Q[j].id); return render(); }
    }
    go("parent-plan"); // qStack is kept so Back returns to the last question
  }
  function answer(v) {
    var q = currentQuestion();
    state.answers[q.id] = v;
    // Changing an answer clears answers to questions that no longer apply.
    Q.forEach(function (x) { if (!applies(x)) delete state.answers[x.id]; });
    nextQuestion();
  }
  function aboutSummary() {
    var bits = [];
    Q.forEach(function (q) {
      var v = state.answers[q.id];
      if (!v || q.id === "more") return;
      var o = optionsOf(q).filter(function (x) { return x.v === v; })[0];
      if (o) bits.push("<span>" + o.icon + " " + (o.sum ? esc(o.sum) : optionText(o)) + "</span>");
    });
    if (!bits.length) return "";
    return '<details class="about-chip"><summary>Based on what you told us</summary><p>' + bits.join("") + '</p></details>';
  }

  function whyPanel() {
    return '<dl class="why-panel">' +
      ["totalCost", "scholarshipHelp", "inflation"].map(function (id) {
        return "<dt>" + esc(D.figures[id].label) + "</dt><dd>" + fig(id) + sourceNote(id) + '</dd>';
      }).join("") + "</dl>";
  }

  // ---------- render ----------
  function roleOf(screen) {
    if (screen === "home") return "home";
    return screen.indexOf("child") === 0 ? "child" : "parent";
  }

  function render() {
    if (!screens[state.screen]) state.screen = "home";
    document.body.dataset.style = "b";
    document.body.dataset.accent = state.style === "o" ? "orange" : "";
    document.body.dataset.role = roleOf(state.screen);
    document.documentElement.lang = state.lang;
    document.body.dataset.uiLang = state.lang;
    document.getElementById("demoBanner").textContent = t("demoBanner");
    app.innerHTML = screens[state.screen]();
    document.querySelectorAll(".lang [data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.lang === state.lang); });
    document.querySelectorAll("[data-style-pick]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.stylePick === state.style); });
  }

  function go(screen) {
    if (screen === state.screen) return;
    state.history.push(state.screen);
    state.screen = screen;
    state.showWhy = false;
    render();
    window.scrollTo(0, 0);
  }

  function say(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = window.SPEECH_LANG[state.lang] || "en-IN";
    window.speechSynthesis.speak(u);
  }

  document.addEventListener("click", function (e) {
    var el = e.target.closest("button, a");
    if (!el) return;
    if (el.dataset.go === "parent-about") state.qStack = [];
    if (el.dataset.go) return go(el.dataset.go);
    if (el.dataset.lang) { state.lang = el.dataset.lang; save("cgps.lang", state.lang); return render(); }
    if (el.dataset.stylePick) { state.style = el.dataset.stylePick; save("cgps.style", state.style); return render(); }
    if (el.dataset.say) return say(el.dataset.say);
    if (el.dataset.answer) return answer(el.dataset.answer);
    if (el.id === "brand") { state.history = []; state.screen = "home"; return render(); }
    switch (el.dataset.action) {
      case "skip":
        delete state.answers[currentQuestion().id];
        return nextQuestion();
      case "redo-about":
        state.qStack = [];
        return go("parent-about");
      case "back":
        if (state.screen === "parent-about" && state.qStack.length > 1) {
          state.qStack.pop();
          return render();
        }
        if (state.screen === "parent-about") state.qStack = [];
        state.screen = state.history.pop() || "home";
        state.showWhy = false;
        return render();
      case "why":
        state.showWhy = !state.showWhy;
        return render();
      case "quest":
        el.closest(".quest").classList.add("is-done");
        el.textContent = "⭐ Star earned!";
        el.disabled = true;
        return;
    }
  });

  render();
})();
