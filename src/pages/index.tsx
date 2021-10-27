import { lazy } from "react"
import { Switch, Redirect, Route } from "react-router-dom"
import { GuardedRoute } from 'app/providers/guarded-router'

const NotesAuthPage = lazy(() => import("./auth"))
const NotesListPage = lazy(() => import("./notes-list"))
const NoteEditPage = lazy(() => import("./note-edit"))
const NoteCreatePage = lazy(() => import("./note-create"))

export const Routing = () => {
    return (
        <Switch>
            <Route exact path="/auth" component={NotesAuthPage} />
            <GuardedRoute exact path="/" component={NotesListPage} />
            <GuardedRoute exact path="/edit/:noteId" component={NoteEditPage} />
            <GuardedRoute exact path="/create" component={NoteCreatePage} />
            <Redirect to="/" />
        </Switch>
    );
};