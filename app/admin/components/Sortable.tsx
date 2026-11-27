"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { type ReactNode, useId } from "react";

export type DragHandleProps = {
  /** Spread onto the element the user grabs (see <DragHandle>). */
  handleProps: Record<string, unknown>;
  isDragging: boolean;
  disabled: boolean;
};

/**
 * A drag-and-drop sortable list/grid. Items are dragged by a handle (so the Edit/Delete buttons
 * keep working normally), with mouse, touch (press and hold) and keyboard (focus the handle,
 * Space to pick up, arrow keys to move, Space to drop) support.
 *
 * `onReorder` receives the dragged id, the id it was dropped on, and the new local order so the
 * page can update immediately while the server saves.
 */
export function SortableList<T extends { id: string }>({
  items,
  onReorder,
  renderItem,
  disabled = false,
  className = "",
}: {
  items: T[];
  onReorder: (activeId: string, overId: string, nextItems: T[]) => void;
  renderItem: (item: T, drag: DragHandleProps) => ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  // Stable id so dnd-kit's accessibility attributes match between server and client renders.
  const dndId = useId();
  const sensors = useSensors(
    // A small movement threshold so a simple click on the handle doesn't start a drag.
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function onDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;
    const from = items.findIndex((i) => i.id === active.id);
    const to = items.findIndex((i) => i.id === over.id);
    if (from < 0 || to < 0) return;
    onReorder(String(active.id), String(over.id), arrayMove(items, from, to));
  }

  return (
    <DndContext id={dndId} sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy} disabled={disabled}>
        <div className={className}>
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} disabled={disabled}>
              {(drag) => renderItem(item, drag)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({
  id,
  disabled,
  children,
}: {
  id: string;
  disabled: boolean;
  children: (drag: DragHandleProps) => ReactNode;
}) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id, disabled });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 20 : undefined,
        position: "relative",
      }}
      className={isDragging ? "opacity-80 shadow-xl ring-2 ring-[#006DDB]" : ""}
    >
      {children({
        handleProps: { ref: setActivatorNodeRef, ...attributes, ...listeners },
        isDragging,
        disabled,
      })}
    </div>
  );
}

/** The grip a user drags an item by. */
export function DragHandle({
  drag,
  label,
  disabledReason,
}: {
  drag: DragHandleProps;
  label: string;
  disabledReason?: string;
}) {
  const { ref, ...rest } = drag.handleProps as { ref: (el: HTMLElement | null) => void };
  return (
    <button
      type="button"
      ref={ref}
      {...(drag.disabled ? {} : rest)}
      disabled={drag.disabled}
      aria-label={drag.disabled ? disabledReason || "Reordering unavailable" : `Drag to reorder ${label}`}
      title={drag.disabled ? disabledReason : "Drag to reorder"}
      className={`inline-flex h-10 w-9 shrink-0 touch-none items-center justify-center border border-[#D2D2D2] bg-white text-[#616161] ${
        drag.disabled
          ? "cursor-not-allowed opacity-40"
          : drag.isDragging
            ? "cursor-grabbing border-[#006DDB] text-[#006DDB]"
            : "cursor-grab hover:border-[#006DDB] hover:text-[#006DDB]"
      }`}
    >
      <GripVertical size={18} aria-hidden />
    </button>
  );
}
