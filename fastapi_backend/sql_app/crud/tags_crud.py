from ..database import Session
from sqlalchemy import literal, func
from ..models.tag import Tag


def get_tags_from_names(db: Session, names: list[str]):
    db_tags: list[Tag] = []
    for tag_name in names:
        db_tag = db.query(Tag).filter_by(name=tag_name).first()
        if not db_tag:
            db_tag = Tag(name=tag_name, id=db.query(func.max(Tag.id)).scalar() + 1)
            db.add(db_tag)
        db_tags.append(db_tag)
    return db_tags


def get_tag_ids_from_names(db: Session, names: list[str]):
    tag_ids: list[int] = []
    for tag_name in names:
        db_tag = db.query(Tag).filter_by(name=tag_name).first()
        if not db_tag:
            raise ValueError(f"Tag {tag_name} does not exist")
        tag_ids.append(db_tag.id)
    return tag_ids


def get_tags(db: Session = Session(), skip: int = 0, limit: int = 50, contains: str = None):
    query = db.query(Tag)
    if contains is not None:
        query = query.filter(Tag.name.contains(contains))

    return query.order_by(Tag.name).offset(skip).limit(limit).all()
