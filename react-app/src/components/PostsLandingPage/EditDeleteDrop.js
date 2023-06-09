import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { logout } from "../../store/session";
import UpdatePostModal from "../UpdatePostModal";
import DeletePostModal from "../UpdatePostModal/DeletePostModal";
import OpenModalButton from "../OpenModalButton";

function EditDeleteDrop({ user, postId }) {
    const dispatch = useDispatch();
    const history = useHistory()

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <button id="caret-icon" onClick={openMenu}>
                <i id="caret-edit-delete" class="fa-solid fa-caret-down"></i>
            </button>
            <div className={ulClassName} ref={ulRef}>
                {user && (
                    <div className="edit-delete-post">
                        <div className="edit-drop">
                            <OpenModalButton

                                buttonText="Edit"
                                modalComponent={<UpdatePostModal postId={postId} />}
                            />
                        </div>
                        <div className="delete-drop">
                            <OpenModalButton

                                buttonText="Delete"
                                modalComponent={<DeletePostModal postId={postId} />}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default EditDeleteDrop;
