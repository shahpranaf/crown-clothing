import React from "react";
import { connect } from "react-redux";
import MenuItem from "../menu-item/menu-item.component";

import "./directory.styles.scss";
import { selectDirectorySections } from "../../redux/directory/directory.selector";

const Directory = ({ sections }) => {
    return (
        <div className="directory-menu">
            {sections.map(({ title, imageUrl, id, size, linkUrl }) => (
                <MenuItem key={id} title={title} imageUrl={imageUrl} linkUrl={linkUrl} size={size} />
            ))}
        </div>
    );
};

const mapStateToProps = state => ({
    sections: selectDirectorySections(state)
});
export default connect(mapStateToProps)(Directory);
