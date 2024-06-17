import { useSection } from "deco/hooks/useSection.ts";
import { SectionProps } from "deco/mod.ts";

export interface Props {
  /** @readonly */
  reminders?: string[];
}

export async function loader(props: Props, req: Request, _ctx: unknown) {
  if (req.headers.get("content-type") !== "application/x-www-form-urlencoded") {
    return props;
  }

  const form = await req.formData();
  const reminder = form.get("reminder");

  if (reminder) {
    if (!props.reminders) {
      props.reminders = [];
    }

    props.reminders.push(reminder.toString());
  }

  return props;
}

export default function HTMXForm(props: SectionProps<typeof loader>) {
  return (
    <div>
      <form
        class="flex container"
        hx-post={useSection({ props })}
        hx-trigger="submit"
        hx-target="closest section"
        hx-swap="outerHTML"
        hx-indicator="#reminderSubmit"
      >
        <label class="mr-4">Reminder</label>
        <div class="flex flex-col">
          <textarea class="textarea textarea-bordered" name="reminder" />
          <button
            id="reminderSubmit"
            type="submit"
            class="btn btn-primary mt-2"
          >
            <span class="[.htmx-request_&]:hidden inline">
              Add reminder
            </span>
            <span class="hidden loading loading-spinner loading-xs [.htmx-request_&]:inline " />
          </button>
        </div>
      </form>
      <div class="border rounded container">
        <h3>Current reminders</h3>
        <ul class="list-disc">
          {props.reminders?.map((reminder) => <li>{reminder}</li>)}
        </ul>
      </div>
    </div>
  );
}
