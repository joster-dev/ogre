import { Component, inject, output } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { Subject, debounceTime } from "rxjs";

import { ChoiceComponent } from "@joster-dev/chaos-control";
import { IconComponent } from "@joster-dev/icon";

import { SettingsStore } from "../settings.store";
import { DeckComponent } from "./deck/deck.component";

@Component({
  selector: "ogre-form",
  imports: [FormsModule, ChoiceComponent, DeckComponent, IconComponent],
  templateUrl: "./form.component.html",
  styleUrl: "./form.component.scss",
})
export class FormComponent {
  protected readonly settings = inject(SettingsStore);

  readonly restart = output<void>();

  protected readonly priorityItems = [
    { key: true, value: "First" },
    { key: false, value: "Second" },
  ];
  protected readonly enabledItems = [
    { key: true, value: "On" },
    { key: false, value: "Off" },
  ];

  private readonly restartSubject = new Subject<void>();

  constructor() {
    this.restartSubject
      .pipe(debounceTime(500), takeUntilDestroyed())
      .subscribe(() => this.restart.emit());
  }

  requestRestart(): void {
    this.restartSubject.next();
  }
}
